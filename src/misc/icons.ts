export const typeIcons = {
  Normal: "/assets/type-icons/Normal_icon.png",
  Fighting: "/assets/type-icons/Fighting_icon.png",
  Flying: "/assets/type-icons/Flying_icon.png",
  Poison: "/assets/type-icons/Poison_icon.png",
  Ground: "/assets/type-icons/Ground_icon.png",
  Rock: "/assets/type-icons/Rock_icon.png",
  Bug: "/assets/type-icons/Bug_icon.png",
  Ghost: "/assets/type-icons/Ghost_icon.png",
  Steel: "/assets/type-icons/Steel_icon.png",
  Fire: "/assets/type-icons/Fire_icon.png",
  Water: "/assets/type-icons/Water_icon.png",
  Grass: "/assets/type-icons/Grass_icon.png",
  Electric: "/assets/type-icons/Electric_icon.png",
  Psychic: "/assets/type-icons/Psychic_icon.png",
  Ice: "/assets/type-icons/Ice_icon.png",
  Dragon: "/assets/type-icons/Dragon_icon.png",
  Dark: "/assets/type-icons/Dark_icon.png",
  Fairy: "/assets/type-icons/Fairy_icon.png",
  Stellar: "/assets/type-icons/Stellar_icon.png",
} as const;

export function typeIcon(key: string): string {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const icon = typeIcons[capitalizedKey as keyof typeof typeIcons];

  if (!icon) {
    return ""; // Return empty string if icon not found
  }

  return icon;
}
