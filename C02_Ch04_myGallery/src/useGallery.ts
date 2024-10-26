import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export interface IImage {
  id: number;
  uri: string;
}

export const useGallery = () => {
  const [images, setImages] = useState<IImage[] | null>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const lastId =
        images && images?.length === 0
          ? 0
          : images
          ? images[images?.length - 1].id
          : 10;

      const newImage: IImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
      };
      if (images) {
        setImages([...images, newImage]);
      } else {
        setImages([newImage]);
      }
    }
  };

  const deleteImage = (imageId: number) => {
    Alert.alert("이미지를 삭제하시겠어요?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        style: "default",
        text: "네",
        onPress: () => {
          const newImages = images?.filter((list) => imageId !== list.id);
          if (newImages) setImages(newImages);
        },
      },
    ]);
  };

  const imageWithADdButton =
    images && images?.length > 0
      ? [
          ...images,
          {
            id: -1,
            uri: "",
          },
        ]
      : [
          {
            id: -1,
            uri: "",
          },
        ];

  return { images, pickImage, deleteImage, imageWithADdButton };
};
