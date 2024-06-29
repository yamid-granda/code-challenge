import EmojiText from "@/components/EmojiText";
import { PRODUCTS_TITLE_TEXT, PRODUCTS_EMOJI } from "@/modules/Products/configs";

export default function StockTitle() {
  return <EmojiText emoji={PRODUCTS_EMOJI}>{PRODUCTS_TITLE_TEXT}</EmojiText>
};
