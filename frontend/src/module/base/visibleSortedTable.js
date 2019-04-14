export const visibleColumns = (
  customColumns = {},
  defaultVisageRow = { tag: "td", class: "text-xs-center" }
) => itemData => {
  if (customColumns[itemData.value]) {
    return customColumns[itemData.value];
  }
  const Tag = defaultVisageRow.tag;
  return (h, item) => (
    <Tag class={defaultVisageRow.class}>{item[itemData.value]}</Tag>
  );
};
