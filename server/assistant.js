// Import the OpenAI API from the openai npm package
import OpenAI from "openai";

const config = useRuntimeConfig();

// Create a new instance of the OpenAI API so we can use it below for our Booky intelligent assistant
const openai = OpenAI({
    apiKey: config.openAi.secretKey,
});

async function parseDocument() {
    try {
        const assistant = createAssistant();
        const thread = createThread();

        const metadata = askQuestion("Parse the document and return a json file containing the story's title, list of characters, plot synopsis, a list of possible misspelled words, paragraph count, and word count.",
                                    thread, assistant);
    }
}

async function createAssistant() {
    try {
        const bookAssistant = await openai.beta.assistants.create({
            instructions:
                "You are a friendly, cheerful, personal writing assistant with a penchant for short stories. When asked a question, offer feedback on the provided material.",
            name: "Bookly",
            tools: [
                { 
                    type: "retrieval" 
                }
            ],
            model: "gpt-4-1106-preview"
        });
    
        console.log(bookAssistant);

        return bookAssistant;
    } catch (error) {
        console.log(error);
    }
}

async function createThread() {
    // Each user will have their own thread
    const thread = await openai.beta.threads.create();

    return thread;
}

async function askQuestion(userQuestion, thread, assistant) {
    await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userQuestion,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
        instructions: "Please address the user as Esteemed Writer."
    });

    let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
    );

    let i = 0;

    while (runStatus.status !== "completed" && i < 4) {
        i++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(
            thread.id, 
            run.id
        );
    }

    if (i === 4 && runStatus.status !== "completed") {
        // return a timeout message
        return "Hmmm...I seem to be struggling with this one. Could you try that again?";
    }
    
    const messages = await openai.beta.threads.messages.list(
        thread.id
    );

    const lastMessageForRun = messages.data.filter(
        (messages) => messages.run_id === run.id && message.role === "assistant"
    )
    .pop();

    if (lastMessageForRun) {
        console.log (lastMessageForRun);

        return lastMessageForRun;
    }
}

module.exports = { createAssistant, createThread, askQuestion }