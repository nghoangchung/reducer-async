import {useTheme, ExtendTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {Input, Border, Icon as IconStyles, Touch} from '~/styles';
import ButtonTextGradient from '../button/ButtonTextGradient';
import Icon from 'react-native-easy-icon';
//Ref text input: https://reactnative.dev/docs/textinput
interface Props {
  //Style
  style?: ViewStyle;
  textStyle?: TextStyle;
  placeholderTextColor?: string; //INPUT_HINT,
  //Value
  value?: string;
  valuePlaceholder?: string;
  //Event
  actionChangeText?: (text: string) => void;
  actionIconRight?: () => void;
  actionIconRightOutSide?: () => void;
  actionButtonRightOutSide?: () => void;
  action?: () => void;
  //Button Image
  sourceIconRight?: any; // require('path asset')
  sourceIconRightOutSide?: any; // require('path asset')
  iconVectorTypeRight?: any; //string
  iconVectorNameRight?: string;
  //Button
  textButtonRightOutSize?: string;
  //Option
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
    | undefined;
}
const InputText: React.FC<Props> = ({
  //Style
  style = undefined,
  textStyle = undefined,
  placeholderTextColor = undefined, //INPUT_HINT,
  //Value
  value = '',
  valuePlaceholder = '',
  //Event
  actionChangeText = undefined,
  actionIconRight = undefined,
  actionIconRightOutSide = undefined,
  actionButtonRightOutSide = undefined,
  action = undefined,
  //Button Image
  sourceIconRight = undefined,
  sourceIconRightOutSide = undefined,
  iconVectorTypeRight = undefined,
  iconVectorNameRight = undefined,
  //Button
  textButtonRightOutSize = undefined,
  //Option
  editable = true,
  keyboardType = 'default',
  secureTextEntry = false,
  numberOfLines = 1,
  multiline = false,
  autoCorrect = true,
  autoCapitalize = 'sentences',
  autoCompleteType = undefined, // 'off'
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  function renderIconRight(sourceIcon: any, actionIcon: any) {
    return sourceIcon ? (
      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => callActionIconRight(actionIcon)}
        activeOpacity={Touch.OPACITY}
      >
        <Image style={styles.icon} source={sourceIcon} resizeMode={'contain'} />
      </TouchableOpacity>
    ) : null;
  }
  function callActionIconRight(actionIcon?: any) {
    isAction() ? action && action() : actionIcon && actionIcon();
  }
  function renderVectorIconRight(
    iconType: any, //string
    iconName?: string, //string
    actionIcon?: any,
  ) {
    return iconType && iconName ? (
      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => callActionIconRight(actionIcon)}
        activeOpacity={Touch.OPACITY}
      >
        <Icon
          type={iconType}
          name={iconName}
          size={IconStyles.WIDTH_ICON}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    ) : null;
  }
  function renderButtonRightOutSide(
    textButton: string | undefined,
    actionButton: any,
  ) {
    return textButton ? (
      <ButtonTextGradient
        style={styles.button}
        title={textButton}
        action={actionButton}
      />
    ) : null;
  }
  const isAction = () => {
    return action && !editable;
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        activeOpacity={isAction() ? Touch.OPACITY : Touch.DISABLE}
        style={[styles.content, style]}
        onPress={() => action && action()}
      >
        {editable ? (
          <TextInput
            underlineColorAndroid="transparent"
            editable={editable}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : theme.colors.textPlaceholder
            }
            style={[
              styles.textInput,
              textStyle ? textStyle : undefined,
              sourceIconRight || (iconVectorTypeRight && iconVectorNameRight)
                ? undefined
                : {paddingRight: Input.PADDING_CONTENT},
            ]}
            value={value}
            placeholder={valuePlaceholder}
            onChangeText={(text) => actionChangeText && actionChangeText(text)}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoCompleteType={autoCompleteType}
          />
        ) : (
          <Text
            style={[
              styles.textInput,
              textStyle ? textStyle : undefined,
              sourceIconRight || (iconVectorTypeRight && iconVectorNameRight)
                ? undefined
                : {paddingRight: Input.PADDING_CONTENT},
              value && value.trim().length > 0
                ? undefined
                : {
                    color: placeholderTextColor
                      ? placeholderTextColor
                      : theme.colors.textPlaceholder,
                  },
            ]}
            numberOfLines={1}
          >
            {value && value.trim().length > 0 ? value : valuePlaceholder}
          </Text>
        )}
        {renderIconRight(sourceIconRight, actionIconRight)}
        {renderVectorIconRight(
          iconVectorTypeRight,
          iconVectorNameRight,
          actionIconRight,
        )}
      </TouchableOpacity>
      {renderIconRight(sourceIconRightOutSide, actionIconRightOutSide)}
      {renderButtonRightOutSide(
        textButtonRightOutSize,
        actionButtonRightOutSide,
      )}
    </View>
  );
};
export default React.memo(InputText);
const createStyles = (theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      height: Input.HEIGHT,
      flex: 1,
      borderColor: theme.colors.line,
      borderWidth: Border.WIDTH,
      borderRadius: Border.RADIUS,
      //backgroundColor: theme.colors.backgroundInput,
    },
    touchIcon: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: IconStyles.TOUCH_MIN_WIDTH,
      height: Input.HEIGHT,
      backgroundColor: 'transparent',
    },
    icon: {
      width: IconStyles.WIDTH_ICON,
      height: IconStyles.HEIGHT_ICON,
    },
    textInput: {
      alignItems: 'center',
      fontSize: Input.FONT_SIZE,
      marginTop: 2,
      paddingLeft: Input.PADDING_CONTENT,
      flex: 1,
      color: theme.colors.textNormal,
      textAlignVertical: 'center',
      //textAlign: 'left',miss text with long text and don't show dots with long text ios  https://github.com/facebook/react-native/issues/14845
    },
    button: {
      minWidth: 90,
      marginLeft: 10,
    },
  });
