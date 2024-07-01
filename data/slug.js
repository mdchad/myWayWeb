const slugToBookIdMapping = {
  bukhari: "ad6a2cc8-f34b-476b-9b7e-6756a3b7d43e",
  muslim: "240360e4-50b4-47a9-9506-9850b0e3bfd7",
  "abi-daud": "52bc6caf-d46c-47e8-bdbb-a1452b721de9",
  tirmidhi: "c4d5ea38-2090-4f28-8ca3-40bb2639d502",
  nasai: "6dc30e76-a364-46ba-80a1-ba9713c80938",
  "ibn-majah": "3b91daa1-acf3-4841-a38a-b1d576396e6c",
};

export function mapBookId(value) {
  if (value) {
    // if it is book id, return the book id
    return slugToBookIdMapping[value] ? slugToBookIdMapping[value] : value;
  }
}

export default slugToBookIdMapping;
