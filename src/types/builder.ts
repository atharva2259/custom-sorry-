export type ThemeId = 'candlelight' | 'starlight' | 'blossom' | 'puppy' | 'covenant';

export type WaxSealIcon = 'heart' | 'rose' | 'branch' | 'knot' | 'star';
export type EnvelopeColor = 'burgundy' | 'navy' | 'kraft' | 'sage' | 'champagne' | 'blush';
export type WaxSealColor = 'gold' | 'ruby' | 'emerald' | 'rose-quartz' | 'bronze';
export type CardTexture = 'parchment' | 'linen' | 'pressed-petals' | 'minimal';
export type StampStyle = 'airmail' | 'floral' | 'lovebirds' | 'gold-ribbon';

export interface CardConfig {
  envelopeColor: EnvelopeColor;
  envelopeFlapOpen: boolean;
  waxSealColor: WaxSealColor;
  waxSealIcon: WaxSealIcon;
  cardTexture: CardTexture;
  stampStyle: StampStyle;
  handwrittenFont: 'font-handwriting' | 'font-serif' | 'font-sans';
  cardGreeting: string;
  cardNote: string;
}

export type BlockType =
  | 'hero'
  | 'sorry_card'
  | 'letter'
  | 'accountability'
  | 'memories'
  | 'reasons_why'
  | 'promise_bond'
  | 'vouchers'
  | 'forgiveness_meter';

export interface BaseBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  headline: string;
  subtitle: string;
  kicker: string;
  showAvatars: boolean;
  romanticStyle: 'candle' | 'floral' | 'starlit' | 'minimal';
}

export interface SorryCardBlock extends BaseBlock {
  type: 'sorry_card';
  title: string;
  subtitle: string;
}

export interface LetterBlock extends BaseBlock {
  type: 'letter';
  salutation: string;
  paragraphs: string[];
  closing: string;
  signoffName: string;
  handwrittenPostscript?: string;
}

export interface AccountabilityItem {
  id: string;
  fault: string;
  realization: string;
}

export interface AccountabilityBlock extends BaseBlock {
  type: 'accountability';
  heading: string;
  subheading: string;
  items: AccountabilityItem[];
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  dateOrPlace?: string;
  imageUrl?: string;
  gradientBg?: string;
}

export interface MemoriesBlock extends BaseBlock {
  type: 'memories';
  heading: string;
  subheading: string;
  memories: MemoryItem[];
}

export interface ReasonItem {
  id: string;
  number: string;
  title: string;
  detail: string;
}

export interface ReasonsWhyBlock extends BaseBlock {
  type: 'reasons_why';
  heading: string;
  subheading: string;
  reasons: ReasonItem[];
}

export interface PromiseBondBlock extends BaseBlock {
  type: 'promise_bond';
  contractTitle: string;
  preamble: string;
  clauses: string[];
  correctiveActions: string[];
  sweetPenalty: string;
  apologizerSignature: string; // text signature or dataUrl
  apologizerSignedDate: string;
  recipientSignature?: string;
  recipientSignedDate?: string;
  sealNumber: string;
}

export interface VoucherItem {
  id: string;
  title: string;
  description: string;
  terms: string;
  redeemed?: boolean;
}

export interface VouchersBlock extends BaseBlock {
  type: 'vouchers';
  heading: string;
  subheading: string;
  vouchers: VoucherItem[];
}

export interface ForgivenessMeterBlock extends BaseBlock {
  type: 'forgiveness_meter';
  heading: string;
  promptText: string;
  options: {
    id: string;
    label: string;
    emoji: string;
    responseMsg: string;
  }[];
}

export type SiteBlock =
  | HeroBlock
  | SorryCardBlock
  | LetterBlock
  | AccountabilityBlock
  | MemoriesBlock
  | ReasonsWhyBlock
  | PromiseBondBlock
  | VouchersBlock
  | ForgivenessMeterBlock;

export interface ApologySite {
  id: string;
  title: string;
  themeId: ThemeId;
  recipientName: string;
  recipientEmail: string;
  apologizerName: string;
  apologizerEmail: string;
  createdDate: string;
  cardConfig: CardConfig;
  blocks: SiteBlock[];
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  colors: {
    bgCanvas: string;
    surfaceCard: string;
    borderHairline: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    badgeBg: string;
    badgeText: string;
  };
  fontDisplay: string;
  fontBody: string;
  aestheticMood: string;
}
