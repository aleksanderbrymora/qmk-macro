import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';
import { CodeShowcase } from './CodeShowcase';
import { Code } from '@chakra-ui/react';
import { store } from './Store';
import { observer } from 'mobx-react-lite';

export const CodeShowcases = observer(() => {
  const { underscoredName, macroString } = store;

  return (
    <Box>
      <CodeShowcase
        title='Enum'
        description='Create (or update) enum for your custom keystrokes. You can
                  name it whatever you want, just stick to the naming scheme
                  used in C'
        code={`enum macros
{
  ${underscoredName} = SAFE_RANGE,
  // your keystroke names continued
}
`}
      />
      <CodeShowcase
        title='Keymap'
        description='Scroll a bit down to your keymap, make sure you pick the
                  correct layer, and replace a key of choice to the name that
                  you picked in the enum - {underscoredName()}'
        code={`const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    // probably a comment with a nice layout of your keymap
    [0] = LAYOUT_planck_mit(
              ${underscoredName}, KC_Q, KC_W, KC_E, KC_R, KC_T //..rest of your keys
    //..more keys
    ), // ..other layers
}
`}
      />
      <CodeShowcase
        title='Handling new macros'
        description={
          <Text>
            There should already be a function <Code>process_record_user</Code>{' '}
            written for you in the default keymap. By default its body is just{' '}
            <Code>return true</Code>. We're going to add a <Code>Switch</Code>{' '}
            to it so you can add more macros later easily in the same manner. If
            you've recorded your keystrokes you should have a ready thing to
            copy below. It might need few adjustments but it gets rid of tedious
            stuff, like managing delays.
          </Text>
        }
        code={`bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    switch (keycode) {
        case ${underscoredName}:
        if (record->event.pressed) {
          // When key is pressed
${macroString}
        } else {
          // When key is released
        }
        break;
    }
    return true;
}`}
      />
    </Box>
  );
});
