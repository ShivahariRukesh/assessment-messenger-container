export function getInitials(name) {
  const filteredName = name.replace(/(Prof\.|Mr\.)\s*/g, "").trim();

  const nameParts = filteredName.split(" ");

  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";

  return firstNameInitial + lastNameInitial;
}
