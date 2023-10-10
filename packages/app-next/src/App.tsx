/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { createApp } from '@backstage/frontend-app-api';
import { pagesPlugin } from './examples/pagesPlugin';
import graphiqlPlugin from '@backstage/plugin-graphiql/alpha';
import techRadarPlugin from '@backstage/plugin-tech-radar/alpha';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import {
  createExtensionOverrides,
  createPageExtension,
} from '@backstage/frontend-plugin-api';
import { entityRouteRef } from '@backstage/plugin-catalog-react';

/*

# Legacy interoperability

Use-cases (prioritized):
 1. Slowly migrate over an existing app to DI, piece by piece
 2. Use a legacy plugin in a new DI app
 3. Use DI in an existing legacy app

Starting point: use-case #1

Potential solutions:
 1. Codemods (we're not considering this for now)
 2. Legacy apps are migrated bottom-up, i.e. keep legacy root, replace pages with DI
 3. Legacy apps are migrated top-down i.e. switch out base to DI, legacy adapter allows for usage of existing app structure

Chosen path: #3

Existing tasks:
  - Adopters can migrate their existing app gradually (~4)
    - Example-app uses legacy base with DI adapters
    - Create an API that lets you inject DI into existing apps - working assumption is that this is enough
  - Adopters can use legacy plugins in DI through adapters (~8)
    - App-next uses DI base with legacy adapters
    - Create a legacy adapter that is able to take an existing extension tree

*/

/* core */

// const discoverPackages = async () => {
//   // stub for now, deferring package discovery til later
//   return ['@backstage/plugin-graphiql'];
// };

/* graphiql package */

/* app.tsx */

const entityPageExtension = createPageExtension({
  id: 'catalog:entity',
  defaultPath: '/catalog/:namespace/:kind/:name',
  routeRef: entityRouteRef,
  loader: async () => <div>Just a temporary mocked entity page</div>,
});

const app = createApp({
  features: [
    graphiqlPlugin,
    pagesPlugin,
    techRadarPlugin,
    userSettingsPlugin,
    createExtensionOverrides({
      extensions: [entityPageExtension],
    }),
  ],
  // bindRoutes({ bind }) {
  //   bind(catalogPlugin.externalRoutes, {
  //     createComponent: scaffolderPlugin.routes.root,
  //   });
  //   bind(scaffolderPlugin.externalRoutes, {
  //     registerComponent: catalogImportPlugin.routes.importPage,
  //   });
  // },
});

// const legacyApp = createLegacyApp({ plugins: [legacyGraphiqlPlugin] });

export default app.createRoot();

// const routes = (
//   <FlatRoutes>
//     {/* <Route path="/" element={<Navigate to="catalog" />} />
//     <Route path="/catalog" element={<CatalogIndexPage />} />
//     <Route
//       path="/catalog/:namespace/:kind/:name"
//       element={<CatalogEntityPage />}
//     >
//       <EntityLayout>
//         <EntityLayout.Route path="/" title="Overview">
//           <Grid container spacing={3} alignItems="stretch">
//             <Grid item md={6} xs={12}>
//               <EntityAboutCard variant="gridItem" />
//             </Grid>

//             <Grid item md={4} xs={12}>
//               <EntityLinksCard />
//             </Grid>
//           </Grid>
//         </EntityLayout.Route>

//         <EntityLayout.Route path="/todos" title="TODOs">
//           <EntityTodoContent />
//         </EntityLayout.Route>
//       </EntityLayout>
//     </Route>
//     <Route
//       path="/catalog-import"
//       element={
//           <CatalogImportPage />
//       }
//     /> */}
//     {/* <Route
//       path="/tech-radar"
//       element={<TechRadarPage width={1500} height={800} />}
//     /> */}
//     <Route path="/graphiql" element={<GraphiQLPage />} />
//   </FlatRoutes>
// );

// export default app.createRoot(
//   <>
//     {/* <AlertDisplay transientTimeoutMs={2500} />
//     <OAuthRequestDialog /> */}
//     <AppRouter>{routes}</AppRouter>
//   </>,
// );
