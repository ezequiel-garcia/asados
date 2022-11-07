import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const resizeAndCompress = async (imageURI) => {
  const manipResult = await manipulateAsync(
    imageURI,
    [{ resize: { height: 150 } }],
    { compress: 0.5, format: SaveFormat.PNG }
  );
  return manipResult;
};
