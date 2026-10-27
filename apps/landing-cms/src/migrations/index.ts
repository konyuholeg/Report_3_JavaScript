import * as migration_20261026_224706_initial from './20261026_224706_initial';
import * as migration_20261027_062614_feature_icons from './20261027_062614_feature_icons';

export const migrations = [
  {
    up: migration_20261026_224706_initial.up,
    down: migration_20261026_224706_initial.down,
    name: '20261026_224706_initial',
  },
  {
    up: migration_20261027_062614_feature_icons.up,
    down: migration_20261027_062614_feature_icons.down,
    name: '20261027_062614_feature_icons'
  },
];
