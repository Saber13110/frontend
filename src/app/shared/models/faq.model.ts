export interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
  /**
   * Optional category used to group FAQs.
   * Components that don't require categorization
   * can simply ignore this field.
   */
  category?: string;
}
