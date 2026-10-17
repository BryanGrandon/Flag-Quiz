const DYNAMIC_KEYS = {
  mode: 'Category_Mode',
  streak: 'Streak_Game',
  storage: 'Temporal_key',
  init_category: 'Init_Category_Type', // Start Game
  init_mode: 'Init_Category_Mode',
}

type DynamicType = keyof typeof DYNAMIC_KEYS

const getDynamicKey = (key: DynamicType) => DYNAMIC_KEYS[key]

type DynamicStorageKey = {
  base: DynamicType
  dynamic: string
}

export const dynamicStorageKey = ({ base, dynamic }: DynamicStorageKey) => {
  const concat = ':_'
  const response = getDynamicKey(base)

  switch (response) {
    case DYNAMIC_KEYS.mode:
      return DYNAMIC_KEYS.mode + concat + dynamic

    case DYNAMIC_KEYS.streak:
      return DYNAMIC_KEYS.streak + concat + dynamic

    case DYNAMIC_KEYS.storage:
      return DYNAMIC_KEYS.storage + concat + dynamic

    case DYNAMIC_KEYS.init_category:
      return DYNAMIC_KEYS.init_category

    case DYNAMIC_KEYS.init_mode:
      return DYNAMIC_KEYS.init_mode

    default:
      return 'Default_Dynamic-Key'
  }
}
