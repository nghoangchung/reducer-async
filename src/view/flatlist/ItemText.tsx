import {ExtendTheme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import { PropsAvatar } from '~/api/types/Props';
import {Border, Touch} from '~/styles';
export interface PropsItemIcon {
  key: string;
  title: string;
}
interface PropsRenderItemIconText {
  index: number;
  item: PropsAvatar;
  actionSelect?: (item: any) => Promise<void>;
}
const ItemText: React.FC<PropsRenderItemIconText> = ({item, actionSelect}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const base64Image = item.pathImage;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => actionSelect && actionSelect(item)}
      activeOpacity={Touch.OPACITY}
    >
      <View style={styles.rightItem}>
        {base64Image && base64Image !== ''? <Image source={{uri: `data:image/jpeg;base64,${base64Image}`}} /> : undefined}
        <Text numberOfLines={3} style={styles.text}>
          {`${JSON.stringify(item.name)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemText);
const HEIGHT = 55;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: HEIGHT,
    },
    rightItem: {
      flex: 1,
      borderBottomColor: _theme.colors.line,
      borderBottomWidth: Border.WIDTH,
      minHeight: HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      color: _theme.colors.textNormal,
    },
  });
