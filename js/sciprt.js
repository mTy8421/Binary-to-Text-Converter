const textInput = document.getElementById("textInput");
const binaryInput = document.getElementById("binaryInput");

// Function: Text to Binary
function textToBinary(text) {
  return text
    .split("")
    .map((char) => {
      const binary = char.charCodeAt(0).toString(2);
      // Pad with zeros to ensure at least 8 bits, or more for Unicode/Thai
      const padding = binary.length > 8 ? binary.length : 8;
      // For better visuals, let's stick to 8 bits for standard ASCII or variable for Thai
      // Standard convention: Just output the raw bits, padded to 8 if < 8.
      return binary.padStart(8, "0");
    })
    .join(" ");
}

// Function: Binary to Text
function binaryToText(binary) {
  // Filter only 0, 1 and whitespace
  const cleanBinary = binary.replace(/[^01\s]/g, "");

  return cleanBinary
    .split(/\s+/)
    .map((bin) => {
      if (bin === "") return "";
      return String.fromCharCode(parseInt(bin, 2));
    })
    .join("");
}

// Event Listeners
textInput.addEventListener("input", () => {
  const text = textInput.value;
  if (text === "") {
    binaryInput.value = "";
    return;
  }
  binaryInput.value = textToBinary(text);
});

binaryInput.addEventListener("input", () => {
  const binary = binaryInput.value;
  // Validate input immediately (visual feedback)
  if (/[^01\s]/.test(binary)) {
    // Optional: You could show a warning here
    // binaryInput.classList.add('border-red-500');
  } else {
    // binaryInput.classList.remove('border-red-500');
  }

  if (binary.trim() === "") {
    textInput.value = "";
    return;
  }
  textInput.value = binaryToText(binary);
});

// Utilities
function clearField(id) {
  document.getElementById(id).value = "";
  if (id === "textInput") binaryInput.value = "";
  if (id === "binaryInput") textInput.value = "";
  showToast("ล้างข้อมูลเรียบร้อย");
}

function copyToClipboard(id) {
  const element = document.getElementById(id);
  if (!element.value) return;

  element.select();
  element.setSelectionRange(0, 99999); // Mobile support

  // Using modern Clipboard API
  navigator.clipboard
    .writeText(element.value)
    .then(() => {
      showToast("คัดลอกลงคลิปบอร์ดแล้ว");
    })
    .catch((err) => {
      // Fallback
      document.execCommand("copy");
      showToast("คัดลอกเรียบร้อย");
    });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  toastMsg.innerText = message;

  // Show
  toast.classList.remove("translate-y-20", "opacity-0");

  // Hide after 2s
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2000);
}

// Initialize with a demo
window.onload = () => {
  const demoText = "สวัสดี";
  textInput.value = demoText;
  binaryInput.value = textToBinary(demoText);
};
