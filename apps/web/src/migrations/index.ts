import * as migration_20261025_141203_initial from './20261025_141203_initial';
import * as migration_20261025_210709_socials from './20261025_210709_socials';

export const migrations = [
  {
    up: migration_20261025_141203_initial.up,
    down: migration_20261025_141203_initial.down,
    name: '20261025_141203_initial',
  },
  {
    up: migration_20261025_210709_socials.up,
    down: migration_20261025_210709_socials.down,
    name: '20261025_210709_socials'
  },
];
