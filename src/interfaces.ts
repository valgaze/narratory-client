import { Language } from "./languages"

export interface Agent {
    agentName: string
    language?: Language,
    narrative: Array<AbstractBotTurn | string | string[]>
    questions?: Array<UserTurn>
    defaultFallbacks?: string[]
    bridges?: string[]
    narratoryKey: string
    googleCredentials: {
        project_id: string
        private_key: string
        client_email: string
    }
}

export interface Enum {
    name: string,
    alts?: string[]
}

export interface AbstractEntity {
    name: string
    default?: string
}

export interface Entity extends AbstractEntity {
    enums: Enum[]
}

export interface DynamicEntity extends Entity {
    url: string
    type: "ON_CREATE" | "AT_RUNTIME" | "ON_CREATE_AND_AT_RUNTIME"
}

export interface SystemEntity extends AbstractEntity {
    category: string
    description: string
    returns: string
    default: string
}

export interface Intent {
    entities?: EntityMap
    examples: string[]
}

export type EntityMap = {
    [key: string]: AbstractEntity
}

export interface UserTurn {
    intent: string[] | Intent
    followup?: BotTurn | BotTurn[] | DynamicBotTurn | DynamicBotTurn[] | string | string[]
    repair?: string | string[]
}

export interface Content {
    image_url?: string
    video_url?: string
    title?: string
    description?: string
}

export interface RichMessage {
    say: string
    content: Content
}

export type ConditionMap = {
    [key: string]: boolean | string | string[]
}

export type VariableMap = {
    [key: string]: string | boolean
}

export interface AbstractBotTurn {
    say?: string | string[]
    label?: string,
    goto?: string,
    event?: string,
    answers?: UserTurn[],
    cond?: ConditionMap
    set?: VariableMap
}

export interface BotTurn extends AbstractBotTurn {
    say: string | string[],
    content?: Content
}

export interface DynamicBotTurn extends AbstractBotTurn {
    say?: string | string[],
    content?: Content
    url: string,
    params?: string[]
}

export interface WebhookResponse {
    say?: string
    set?: VariableMap
}

export function isDynamicBotTurn(abstractTurn: AbstractBotTurn | BotTurn | DynamicBotTurn) {
    return abstractTurn && (abstractTurn as DynamicBotTurn).url !== undefined
}

export function isDynamicEntity(abstractEntity: AbstractEntity | Entity | DynamicEntity) {
    return abstractEntity && (abstractEntity as DynamicEntity).url !== undefined
}

export function isSystemEntity(abstractEntity: AbstractEntity | Entity | SystemEntity) {
    return abstractEntity && (abstractEntity as Entity).enums === undefined
}