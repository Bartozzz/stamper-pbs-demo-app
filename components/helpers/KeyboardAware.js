import * as React from "react";
import {
  UIManager,
  Dimensions,
  Platform,
  TextInput,
  Keyboard,
  View
} from "react-native";

/**
 * Keyboard aware is a prop render utility which re-renders its children when
 * the keyboard shows up or disappears. It passes down some extra props for
 * manually setting the padder for pushing the focused input up.
 *
 * @see   KeyboardPadder
 */
export default class KeyboardAware extends React.Component {
  static defaultProps = {
    padder: 30
  };

  keyboardDidShowListener;
  keyboardDidHideListener;

  state = {
    keyboardHeight: 0,
    safeKeyboardHeight: 0,
    fieldHeight: 0,
    fieldOriginY: 0,
    fieldPositionY: 0
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardShow
    );

    // NOTE: keyboardWillHide is not available on Android:
    if (Platform.OS === "android") {
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        this._keyboardHide
      );
    } else {
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this._keyboardHide
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardShow = event => {
    // const State = TextInput.State;
    // const Field = State.currentlyFocusedField();

    // The keyboard height differs between platforms, especially when a custom
    // input method like SwiftKey is used, so add a little extra.
    const keyboardHeight = event.endCoordinates.height;
    const safeKeyboardHeight = keyboardHeight + this.props.padder;

    this.setState({
      keyboardHeight,
      safeKeyboardHeight
    });

    if (this.props.onKeyboardShow) {
      this.props.onKeyboardShow(keyboardHeight, safeKeyboardHeight);
    }

    // UIManager.measure(Field, (x, y, width, height, pageX, pageY) => {
    //   if (KeyboardAware.isInputVisible(pageY, height, keyboardHeight)) {
    //     console.log("Input is visible before setState");
    //   } else {
    //     console.log("Input is invisible before setState");
    //   }
    //
    //   this.setState({
    //     fieldHeight: height,
    //     fieldOriginY: y,
    //     fieldPositionY: pageY
    //   });
    // });
  };

  _keyboardHide = () => {
    // Reset the state:
    this.setState({
      keyboardHeight: 0,
      safeKeyboardHeight: 0,
      fieldHeight: 0,
      fieldOriginY: 0,
      fieldPositionY: 0
    });

    if (this.props.onKeyboardHide) {
      this.props.onKeyboardHide();
    }
  };

  render() {
    return this.props.children({ ...this.state });
  }

  static isFocusedInputVisible(bottomOffset, callback) {
    const State = TextInput.State;
    const Field = State.currentlyFocusedField();

    UIManager.measure(Field, (x, y, width, height, pageX, pageY) => {
      callback(KeyboardAware.isInputVisible(pageY, height, bottomOffset));
    });
  }

  static isInputVisible(y, height, bottomOffset) {
    const screenRectTop = Dimensions.get("window").height - bottomOffset;
    const buttonRectBottom = y + height;

    return buttonRectBottom <= screenRectTop;
  }
}

/**
 * KeyboardPadder is a simple, empty View which has a forced height. It should
 * be put at the end of your view, inside KeyboardAware prop render. It will
 * add an extra margin on the bottom and push all the content up, so it's not
 * hidden by keyboard.
 *
 * @param   props
 * @param   props.height  – The padder height. Usually keyboardHeight or
 *                          safeKeyboardHeight.
 * @param   props.force   – Whether to force the padder on all devices.
 *                          By default, the padder is only shown on iOS.
 * @param   props.style   – Additional styles to pass in the padder view
 */
export function KeyboardPadder(props) {
  const PadderView = <View style={[props.style, { height: props.height }]} />;

  return Platform.select({
    ios: PadderView,
    android: PadderView
  });
}
