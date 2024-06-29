import EmojiText from "@/components/EmojiText";
import { ORDERS_TITLE_TEXT, ORDERS_EMOJI } from "../../configs";

export function OrdersTitle() {
  return <EmojiText emoji={ORDERS_EMOJI}>{ORDERS_TITLE_TEXT}</EmojiText>
}