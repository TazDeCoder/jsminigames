export default function generateRoomId(chars: string, len = 5) {
  let result = '';

  for (let i = 0; i < len; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
