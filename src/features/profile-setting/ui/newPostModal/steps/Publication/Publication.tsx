import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import Image from "next/image";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";

export const Publication = () => {
  const cropContext = useImageCropContext();
  const {previousStep} = useWizard();

  return (
    <NewPostModal isOpen={cropContext.isOpen} title={'Publication'} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span>Publish</span>}>
      <img src={cropContext.photos[0].filteredUrl} alt="image" />
    </NewPostModal>
  );
};
