import { cast, destroy, getParent, SnapshotIn, types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import pretty from 'pretty-ms';

export const Key = types
  .model({
    id: types.identifier,
    key: types.string,
    clickedAt: types.optional(types.Date, new Date()),
    keydown: types.boolean,
  })
  .views((self) => ({
    get timestamp() {
      const time: number = getParent<typeof RootStore>(
        self,
        2,
      ).startedAt.getTime();
      const difference = self.clickedAt.getTime() - Number(time);
      return pretty(difference, { colonNotation: true });
    },
    get isModifier() {
      return (
        self.key === 'Shift' ||
        self.key === 'Control' ||
        self.key === 'Meta' ||
        self.key === 'Alt'
      );
    },
  }))
  .actions((self) => ({
    delete() {
      getParent<typeof RootStore>(self, 2).remove(self);
    },
  }));

const RootStore = types
  .model({
    keys: types.array(Key),
    isRecording: types.optional(types.boolean, false),
    startedAt: types.optional(types.Date, new Date()),
    showTimestamps: types.optional(types.boolean, false),
    name: types.optional(types.string, ''),
  })
  .views((self) => ({
    get underscoredName() {
      return self.name.trim() === ''
        ? 'NAME_OF_YOUR_MACRO'
        : self.name.toUpperCase().trim().split(' ').join('_');
    },
    get macroString() {
      const elements: string[] = [''];

      const addModifierToOut = (
        str: string,
        isDown: boolean,
        delay?: number,
      ) => {
        elements.push(
          isDown
            ? `SS_DOWN(X_${str.toUpperCase()})`
            : `SS_UP(X_${str.toUpperCase()})`,
          '',
        );
        if (delay) elements.push(` SS_DELAY(${delay}) `);
      };

      if (self.showTimestamps) {
      } else {
        self.keys.forEach((k) => {
          if (k.isModifier) {
            addModifierToOut(k.key, k.keydown);
          } else {
            for (let i = elements.length - 1; i >= 0; i--) {
              console.log({ i });
              if (!/SS_/.test(elements[i])) {
                if (!k.keydown) elements[i] += k.key;
                break;
              }
            }
          }
        });
        // console.log({ elements });
      }
      return elements.join('\n').replace(/\n\n/gi, '');
    },
  }))
  .actions((self) => ({
    reset() {
      self.keys = cast([]);
      self.isRecording = false;
      self.startedAt = new Date();
    },
    addKey(e: KeyboardEvent) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (e.repeat) return;
      if (self.isRecording) {
        self.keys.push(
          Key.create({
            id: nanoid(),
            key: e.key,
            clickedAt: new Date(),
            keydown: e.type === 'keydown',
          }),
        );
      }
    },
    toggleRecording() {
      self.isRecording = !self.isRecording;
    },
    toggleTimestamps() {
      self.showTimestamps = !self.showTimestamps;
    },
    updateName(name: string) {
      self.name = name;
    },
    remove(item: SnapshotIn<typeof Key>) {
      const itemIndex = self.keys.findIndex((k) => k.id === item.id);
      const direction = item.keydown ? 1 : -1;
      for (
        let i = itemIndex + direction;
        i < self.keys.length;
        i += direction
      ) {
        if (self.keys[i].key === item.key) {
          if (item.keydown !== self.keys[i].keydown) {
            destroy(self.keys[i]);
            break;
          }
        }
      }
      destroy(item);
    },
  }));

export const store = RootStore.create();
