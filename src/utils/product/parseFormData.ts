type Characteristics = {
  key: string;
  value: string;
};

export function parseCharacteristics(chats: Characteristics[]) {
  return chats.reduce(
    (acc: Record<string, string | number | boolean>, item) => {
      if (["true", "false"].includes(item.value)) {
        acc[item.key] = item.value === "true";
      } else if (!isNaN(Number(item.value))) {
        acc[item.key] = Number(item.value);
      } else {
        acc[item.key] = item.value;
      }
      return acc;
    },
    {},
  );
}
export function createFormCharacteristics(
  chars: Record<string, string | number | boolean>,
) {
  return Object.entries(chars).reduce(
    (acc: Characteristics[], item) => {
      const [key, value] = item;
      acc.push({
        key,
        value: String(value),
      });
      return acc;
    },
    [],
  );
}
