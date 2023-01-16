import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from '../../modules/formBuilder';
import { T_ProfileSchema, T_UserInfoData, validationProfileSchema } from '../../global/types';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';
import { UseFormReturn } from 'react-hook-form';
import { authApi } from '../../api';
import { PATHS } from '../../routes';
import classes from './ProfileChangeData.module.scss';
import { userApi } from '../../api/User';

const FIELDS: T_FormFieldNames = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Пользователь',
    fields: getFormFields(FIELDS),
    links: [{
      to: PATHS.PROFILE,
      title: 'Назад',
    }],
    submit: {
      title: 'Сохранить',
    },
  };
};

export const ProfileChangeData: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const [userInfo, setUserInfo] = useState<T_UserInfoData | undefined>(undefined);
  useEffect(() => {
    authApi.getInfo<T_UserInfoData>()
      .then((response) => {
        setUserInfo(response);
      }).catch((e) => console.log(e));
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = async (data: T_UserInfoData) => {
    try {
      await userApi.changeProfile({ ...data, avatar: null });
      if (formRef && formRef.current) {
        const formData = new FormData(formRef.current);
        await userApi.changePhoto(formData);
      }
      navigate(PATHS.PROFILE);
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
        setFieldErrors();
      }
    }
  };

  const getFormApi = (api: UseFormReturn) => {
    if (!formApi) setFormApi(api);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.root__formWrapper}>
        <FormBuilder<T_UserInfoData, T_ProfileSchema>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationProfileSchema}
          getFormApi={getFormApi}
          values={userInfo}
          isEditableAvatar={true}
          formRef={formRef}
        />
      </Box>
    </Box>
  );
};
