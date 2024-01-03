import OpenAI from "openai";
const openai = new OpenAI();

async function uploadFile(file) {
    const uploadedFile = await openai.files.create({
        file: file,
        purpose: "assistants",
    })
}

async function associateFileWithAssistant(assistantId, fileId) {
    const storyFile = await openai.beta.assistants.files.create(
        assistantId,
        {
            file_id: fileId
        }
    )
}

associateFileWithAssistant();