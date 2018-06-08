export function saveKeydown(letter){
  return {
    type: "SAVE_LETTER",
    payload: letter
  }
}
