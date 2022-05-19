import React, {useCallback, useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import ScreenBase from './base/ScreenBase';
import {ContentScreen, Views} from '~/styles';
import InputText from '~/view/input/InputText';
import {AppNavigate} from '~/AppNavigate';
import {login} from '~/api/ApiUser';
import {showMessage} from '~/view/MyAlert';
import KeyScreens from './constant/KeyScreens';
import {useMemo} from 'react';
import {ExtendTheme} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {PropsScreen} from './types/types';
import {RequestLogin} from '~/api/types/request';
import ButtonTextGradient from '~/view/button/ButtonTextGradient';
import {useTranslation} from 'react-i18next';
import {useAppContextAuth} from '~/context/context/ContextAuth';
import { PropsAvatar } from '~/api/types/Props';
import ItemText from '~/view/flatlist/ItemText';

const ScreenList: React.FC<PropsScreen> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user,setUser} = useAppContextAuth();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<PropsAvatar[]>([]);
  
  const actionAdd = useCallback(async () => {
    try {
      // setLoading(true);
      // const response = [];
      // await setUser(response);
      setLoading(false);
      AppNavigate.next(navigation, KeyScreens.update);
    } catch (error: any) {
      setLoading(false);
      showMessage(error.msg);
    }
  }, [data]);

  return (
    <ScreenBase isShowHeader={false} isLoading={isLoading} isDisableScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>{t('List')}</Text>

        <ButtonTextGradient
          style={styles.space}
          title={t('Add')}
          action={actionAdd}
        />
        <FlatList
        //contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={user?.avatars}
        renderItem={({item, index}: {item: any, index: number}) => (
          <ItemText
            item={item}
            index={index}
            actionSelect={undefined}
          />
        )}
        keyExtractor={(item: any) => item.key}
      />
      </View>
    </ScreenBase>
  );
};
export default ScreenList;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      margin: ContentScreen.MARGIN,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: _theme.colors.textTitle,
      alignSelf: 'center',
      marginTop: 100,
      marginBottom: 10,
    },
    space: {
      marginTop: Views.SPACE * 2,
    },
  });
/*
  useEffect(() => {
    let isLogin = false;
    setInterval(() => {
      if (isLogin) {
        contextSetUser(null);
      } else {
        contextSetUser({
          user_token: '1',
          user_name: '2',
          user_role: '3',
        });
      }
      isLogin = !isLogin;
    }, 5000);
  }, []);
  */
