export function getFirstAndLastName(fullName) {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    return {
        firstName: firstName,
        lastName: lastName
    };
}
