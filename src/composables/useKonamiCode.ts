import { ref } from "@vue/composition-api";

export const useKonamiCode = (callback: Function) => {
  const pos = ref(0);
  const kode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  const codeSequenceListen = (event: KeyboardEvent) => {
    const length = kode.length;
    if (kode[pos.value] !== event.keyCode) {
      pos.value = 0;
      return;
    } else if (pos.value === length - 1) {
      callback();
      pos.value = 0;
    } else {
      console.log("go on");
      pos.value++;
    }
  };

  const start = () => {
    document.addEventListener("keydown", codeSequenceListen);
  };

  const stop = () => {
    document.removeEventListener("keydown", codeSequenceListen);
  };

  return { start, stop };
};
