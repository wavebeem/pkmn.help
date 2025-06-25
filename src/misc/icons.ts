import Normal_icon from "../assets/type-icons/Normal_icon.png";
import Fighting_icon from "../assets/type-icons/Fighting_icon.png";
import Flying_icon from "../assets/type-icons/Flying_icon.png";
import Poison_icon from "../assets/type-icons/Poison_icon.png";
import Ground_icon from "../assets/type-icons/Ground_icon.png";
import Rock_icon from "../assets/type-icons/Rock_icon.png";
import Bug_icon from "../assets/type-icons/Bug_icon.png";
import Ghost_icon from "../assets/type-icons/Ghost_icon.png";
import Steel_icon from "../assets/type-icons/Steel_icon.png";
import Fire_icon from "../assets/type-icons/Fire_icon.png";
import Water_icon from "../assets/type-icons/Water_icon.png";
import Grass_icon from "../assets/type-icons/Grass_icon.png";
import Electric_icon from "../assets/type-icons/Electric_icon.png";
import Psychic_icon from "../assets/type-icons/Psychic_icon.png";
import Ice_icon from "../assets/type-icons/Ice_icon.png";
import Dragon_icon from "../assets/type-icons/Dragon_icon.png";
import Dark_icon from "../assets/type-icons/Dark_icon.png";
import Fairy_icon from "../assets/type-icons/Fairy_icon.png";
import Stellar_icon from "../assets/type-icons/Stellar_icon.png";

export const typeIcons = {
  Normal: Normal_icon,
  Fighting: Fighting_icon,
  Flying: Flying_icon,
  Poison: Poison_icon,
  Ground: Ground_icon,
  Rock: Rock_icon,
  Bug: Bug_icon,
  Ghost: Ghost_icon,
  Steel: Steel_icon,
  Fire: Fire_icon,
  Water: Water_icon,
  Grass: Grass_icon,
  Electric: Electric_icon,
  Psychic: Psychic_icon,
  Ice: Ice_icon,
  Dragon: Dragon_icon,
  Dark: Dark_icon,
  Fairy: Fairy_icon,
  Stellar: Stellar_icon,
} as const;

export function typeIcon(key: string): string {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  return typeIcons[capitalizedKey as keyof typeof typeIcons];
}
