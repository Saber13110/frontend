export interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
  /** Optional category used for advanced filtering */
  category?: string;
}
