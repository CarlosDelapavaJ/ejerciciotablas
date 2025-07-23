import {
  html,
  fixture,
  assert,
  fixtureCleanup
} from '@open-wc/testing';
import '../cells-co-ejecicio-cell-ui.js';

suite('CellsCoEjecicioCellUi', () => {
  let el;

  teardown(() => fixtureCleanup());

  suite('default', () => {
    setup(async () => {
      el = await fixture(html`
        <cells-co-ejecicio-cell-ui></cells-co-ejecicio-cell-ui>
      `);
      await el.updateComplete;
    });

    test('a11y', async () => {
      await assert.isAccessible(el);
    });
  });
});
