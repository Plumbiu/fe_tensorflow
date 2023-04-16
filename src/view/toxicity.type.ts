interface IContentList {
  text: string
  label: string
  warm: string
  cold: string
  match: boolean
}

interface IToxicityTypeMap {
  identity_attack: string
  insult: string
  obscene: string
  severe_toxicity: string
  sexual_explicit: string
  threat: string
  toxicity: string
}

interface SpanMethodProps {
  rowIndex: number
  columnIndex: number
}

type TLabel = 'identity_attack' | 'insult' | 'obscene' | 'severe_toxicity' | 'sexual_explicit' | 'threat' | 'toxicity'


interface IPredictions {
  results: {
    probabilities: number[]
    match: boolean
  }[],
  label: TLabel
}

export type {
  IToxicityTypeMap,
  SpanMethodProps,
  IPredictions,
  IContentList
}