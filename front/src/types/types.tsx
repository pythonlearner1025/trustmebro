export type ChatObject = {
    from: string
    type: 'bot_hint' | 'bot_answer' | 'bot_question' | 'human_answer'
    body: string
    desmos: DesmosObject | null
    idx: number
}

export type DesmosObject = {
    isIntegral: boolean
    isDiff: boolean
    func: string
    integrals: Array<string>
    diffs: Array<string>
}

export type SavedQuestion = {
    question: string
    chatLog: Array<ChatObject>
}