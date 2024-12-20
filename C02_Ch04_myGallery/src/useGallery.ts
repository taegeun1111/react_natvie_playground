import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IImage {
  id: number;
  uri: string;
  albumId?: number;
}

export interface ISelectedAlbum {
  id: number;
  title: string;
}

const defaultAlbum = {
  id: 1,
  title: "기본",
};

export const useGallery = () => {
  const [images, setImages] = useState<IImage[] | null>([]);
  const [selectedAlbum, setSelectedAlbum] =
    useState<ISelectedAlbum>(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<null | IImage>(null);

  const _setImages = (newImages: IImage[]) => {
    setImages(newImages);
    AsyncStorage.setItem("images", JSON.stringify(newImages));
  };
  const _setAlbums = (newAlbums: ISelectedAlbum[]) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem("albums", JSON.stringify(newAlbums));
  };

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
          : 0;

      const newImage: IImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      if (images) {
        _setImages([...images, newImage]);
      } else {
        _setImages([newImage]);
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
          if (newImages) _setImages(newImages);
        },
      },
    ]);
  };

  const filteredImages = images?.filter(
    (list) => list.albumId === selectedAlbum.id
  );

  const imageWithADdButton =
    filteredImages && filteredImages?.length > 0
      ? [
          ...filteredImages,
          {
            id: -1,
            uri: "",
            albumId: 1,
          },
        ]
      : [
          {
            id: -1,
            uri: "",
            albumId: 1,
          },
        ];

  const openTextInputModal = () => setTextModalVisible(true);
  const closeTextInputModal = () => setTextModalVisible(false);
  const openBigImgModal = () => setImgModalVisible(true);
  const closeBigImgModal = () => setImgModalVisible(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;

    if (lastId) {
      const newAlbum = {
        id: lastId + 1,
        title: albumTitle,
      };

      _setAlbums([...albums, newAlbum]);
      setSelectedAlbum(newAlbum);
    }
  };

  const resetAlbumTitle = () => {
    setAlbumTitle("");
  };

  const selectAlbum = (album: ISelectedAlbum) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId: number) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본 앨범은 삭제할 수 없어요.");
      return;
    }
    Alert.alert("이미지를 삭제하시겠어요?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        style: "default",
        text: "네",
        onPress: () => {
          const newAlbums = albums?.filter((list) => albumId !== list.id);
          if (newAlbums) {
            _setAlbums(newAlbums);
            setSelectedAlbum(defaultAlbum);
            setIsDropdownOpen(false);
          }
        },
      },
    ]);
  };

  const selectedImage = (uri: IImage) => {
    setSelectedImg(uri);
  };

  const moveToPreviousImage = () => {
    const selectedImageIndex = filteredImages?.findIndex(
      (image) => image.id === selectedImg?.id
    );
    if (selectedImageIndex === 0) {
      return;
    } else {
      if (selectedImageIndex !== undefined && filteredImages) {
        const previousIdx = selectedImageIndex - 1;
        const previousImage = filteredImages[previousIdx];
        setSelectedImg(previousImage);
      }
    }
  };

  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages?.findIndex(
      (image) => image.id === selectedImg?.id
    );

    if (filteredImages && selectedImageIndex === filteredImages?.length - 1) {
      return;
    } else {
      if (selectedImageIndex !== undefined && filteredImages) {
        const nextIdx = selectedImageIndex + 1;
        const previousImage = filteredImages[nextIdx];
        setSelectedImg(previousImage);
      }
    }
  };

  const selectedImageIndex = filteredImages?.findIndex(
    (image) => image.id === selectedImg?.id
  );

  const showPreviousArrow = selectedImageIndex === 0;
  const showNextArrow =
    filteredImages && selectedImageIndex === filteredImages?.length - 1;

  const initValues = async () => {
    const imagesFromStorage = await AsyncStorage.getItem("images");
    if (imagesFromStorage !== null) {
      const pared = JSON.parse(imagesFromStorage);
      setImages(pared);
    }

    const albumsFromStorage = await AsyncStorage.getItem("albums");
    if (albumsFromStorage !== null) {
      const pared = JSON.parse(albumsFromStorage);
      setAlbums(pared);
    }
  };

  useEffect(() => {
    initValues();
  }, []);

  return {
    pickImage,
    deleteImage,
    imageWithADdButton,
    selectedAlbum,
    textModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    imgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectedImage,
    selectedImg,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
