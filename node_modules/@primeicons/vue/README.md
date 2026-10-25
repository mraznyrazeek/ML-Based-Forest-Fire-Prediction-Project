# @primeicons/vue

PrimeIcons for Vue 3 - 300+ customizable SVG icons as Vue components.

## Installation

```bash
npm install @primeicons/vue
# or
pnpm add @primeicons/vue
# or
yarn add @primeicons/vue
```

## Usage

### Import All Icons

```vue
<script setup>
import { Search, Home, User, Cog } from '@primeicons/vue';
</script>

<template>
    <Search />
    <Home :size="32" />
    <User color="blue" />
    <Cog size="2rem" color="#ff0000" />
</template>
```

### Import Individual Icons (Tree-Shakeable)

```vue
<script setup>
import Search from '@primeicons/vue/search';
import Home from '@primeicons/vue/home';
</script>

<template>
    <Search :size="24" />
    <Home :size="24" color="green" />
</template>
```

## Props

All icon components accept the following props:

| Prop    | Type               | Default        | Description                  |
| ------- | ------------------ | -------------- | ---------------------------- |
| `size`  | `number \| string` | `24`           | Icon size (width and height) |
| `color` | `string`           | `currentColor` | Icon color                   |
| `class` | `string`           | `''`           | Additional CSS class         |
| `style` | `string \| object` | `{}`           | Inline styles                |
| `spin`  | `boolean`          | `false`        | Applies a rotation animation |

## Examples

### Basic Usage

```vue
<script setup>
import { Heart, Star, Bell } from '@primeicons/vue';
</script>

<template>
    <Heart />
    <Star :size="32" />
    <Bell color="red" />
</template>
```

### With Custom Styles

```vue
<script setup>
import { Search } from '@primeicons/vue';
</script>

<template>
    <Search :size="24" color="#007bff" :style="{ marginRight: '8px' }" class="my-icon" />
</template>
```

### Dynamic Icon Rendering

```vue
<script setup>
import * as Icons from '@primeicons/vue';
import { computed } from 'vue';

const props = defineProps<{ name: string }>();

const IconComponent = computed(() => Icons[props.name]);
</script>

<template>
    <component :is="IconComponent" v-if="IconComponent" v-bind="$attrs" />
</template>
```

### With Button

```vue
<script setup>
import { Search, Plus, Trash } from '@primeicons/vue';
</script>

<template>
    <button><Search :size="16" /> Search</button>

    <button><Plus :size="16" /> Add Item</button>

    <button><Trash :size="16" color="red" /> Delete</button>
</template>
```

### Global Registration (Optional)

```ts
// main.ts
import { createApp } from 'vue';
import { Search, Home, User } from '@primeicons/vue';
import App from './App.vue';

const app = createApp(App);

// Register icons globally
app.component('SearchIcon', Search);
app.component('HomeIcon', Home);
app.component('UserIcon', User);

app.mount('#app');
```

## TypeScript

Full TypeScript support:

```vue
<script setup lang="ts">
import { Search } from '@primeicons/vue';
import type { IconProps } from '@primeicons/core';

const iconProps: IconProps = {
    size: 24,
    color: 'blue'
};
</script>

<template>
    <Search v-bind="iconProps" />
</template>
```

## Spin

Setting `spin` to `true` adds `p-icon-spin` to the SVG element's class list. The `p-icon-spin` class comes from PrimeUI's stylesheet.

```vue
<script setup>
import { Spinner, Refresh, Cog } from '@primeicons/vue';
import { ref } from 'vue';

const isLoading = ref(true);
</script>

<template>
    <Spinner :spin="true" />
    <Refresh :spin="true" :size="24" />
    <Cog :spin="isLoading" color="gray" />
</template>
```

The animation can be overridden via CSS:

```css
.p-icon-spin {
    animation: p-icon-spin 1s linear infinite;
}

@keyframes p-icon-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

## CSS Classes

Each icon automatically includes these CSS classes:

- `p-icon` - Base class for all icons
- `p-icon-{name}` - Specific class for each icon (e.g., `p-icon-search`)

```css
/* Style all icons */
.p-icon {
    transition: color 0.2s;
}

/* Style specific icon */
.p-icon-heart:hover {
    color: red;
}
```

## Metadata & Icon Lookup

Icon metadata is managed by the `@primeicons/metadata` package and re-exported here for convenience:

```typescript
import { ICON_MAP, ICON_MAP_BY_NAME, findIcons } from '@primeicons/metadata/vue';

// Find icon by name (kebab-case)
const iconData = ICON_MAP_BY_NAME['check-circle'];
const CheckCircle = iconData.component; // Already lazy-loaded component

// Search and use
const results = findIcons('arrow');
results.forEach((icon) => {
    const Component = icon.component;
    // Use with <component :is="Component" />
});
```

Alternatively, import directly from the metadata package:

```typescript
import { ICON_MAP, findIcons } from '@primeicons/metadata/vue';
```

### Metadata API

| Variable                | Type                                | Description                |
| ----------------------- | ----------------------------------- | -------------------------- |
| `ICON_MAP`              | `IconMetadataEntry[]`               | All icons as array         |
| `ICON_MAP_BY_NAME`      | `Record<string, IconMetadataEntry>` | Indexed by kebab-case name |
| `ICON_MAP_BY_COMPONENT` | `Record<string, IconMetadataEntry>` | Indexed by component name  |
| `ICON_MAP_BY_CAMEL`     | `Record<string, IconMetadataEntry>` | Indexed by camelCase name  |
| `TOTAL_ICONS`           | `number`                            | Total icon count           |
| `PACKAGE_INFO`          | `object`                            | Package metadata           |

| Function              | Returns               | Description                   |
| --------------------- | --------------------- | ----------------------------- |
| `getIconNames()`      | `string[]`            | All kebab-case icon names     |
| `getComponentNames()` | `string[]`            | All component names           |
| `findIcons(query)`    | `IconMetadataEntry[]` | Search icons by partial match |

### JSON Metadata

Access the raw JSON metadata directly:

```typescript
import metadata from '@primeicons/metadata/vue.json';

console.log(manifest.icons[0]); // { name: 'address-book', component: 'AddressBook', ... }
```

## Icon List

The library includes 300+ icons including:

- Navigation: `ArrowLeft`, `ArrowRight`, `ChevronUp`, `ChevronDown`
- Actions: `Search`, `Plus`, `Minus`, `Check`, `Times`
- Objects: `Home`, `User`, `Cog`, `File`, `Folder`
- Social: `Facebook`, `Twitter`, `Github`, `Linkedin`
- And many more...

View the complete list at [primeicons.dev](https://primeicons.dev).

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
