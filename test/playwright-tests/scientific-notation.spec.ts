import type { MathfieldElement } from '../../src/public/mathfield-element';

import { test, expect, } from '@playwright/test';

test('5e-2/4 should parse as (5e-2)/4', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  // Type scientific notation followed by division
  await page.locator('#mf-1').pressSequentially('5e-2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // The entire scientific notation should be in the numerator
  expect(latex).toBe('\\frac{5e-2}{4}');
});

test('5e+2/4 should parse as (5e+2)/4', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('5e+2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{5e+2}{4}');
});

test('5E-2/4 should parse as (5E-2)/4 with capital E', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('5E-2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{5E-2}{4}');
});

test('1.5e-3/2 should parse as (1.5e-3)/2 with decimal', async ({
  page,
}) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('1.5e-3/2');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{1.5e-3}{2}');
});

test('3.14e-10/7 should parse as (3.14e-10)/7 with multi-digit exponent', async ({
  page,
}) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('3.14e-10/7');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{3.14e-10}{7}');
});

test('5e-2-3 should parse as (5e-2)-3', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  // Type scientific notation followed by subtraction
  await page.locator('#mf-1').pressSequentially('5e-2-3');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // The minus after the scientific notation should be treated as subtraction
  expect(latex).toBe('5e-2-3');
});

test('5e-2+3 should parse as (5e-2)+3', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('5e-2+3');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // The plus after the scientific notation should be treated as addition
  expect(latex).toBe('5e-2+3');
});

test('2+5e-2/4 should parse as 2+(5e-2)/4', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('2+5e-2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // Only the scientific notation should be in the numerator, not the "2+"
  expect(latex).toBe('2+\\frac{5e-2}{4}');
});

test('5e-2*3 should parse as (5e-2)*3', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('5e-2*3');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('5e-2\\cdot3');
});

test('5e2/4 should parse as (5e2)/4 without sign', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  // Scientific notation without explicit + or - in exponent
  await page.locator('#mf-1').pressSequentially('5e2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{5e2}{4}');
});

test('1.23e10/5 should parse as (1.23e10)/5', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('1.23e10/5');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('\\frac{1.23e10}{5}');
});

test('x+5e-2/4 should parse as x+(5e-2)/4', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  await page.locator('#mf-1').pressSequentially('x+5e-2/4');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // Variable followed by scientific notation in fraction
  expect(latex).toBe('x+\\frac{5e-2}{4}');
});

test('e-2 should parse as e-2, not scientific notation', async ({
  page,
}) => {
  await page.goto('/dist/playwright-test-page/');

  // Just "e" without a number before it should not be treated as scientific notation
  await page.locator('#mf-1').pressSequentially('e-2');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  expect(latex).toBe('e-2');
});

test('5e-2.5 should parse with decimal in exponent', async ({ page }) => {
  await page.goto('/dist/playwright-test-page/');

  // Type scientific notation with a decimal point after the exponent
  await page.locator('#mf-1').pressSequentially('5e-2.5');

  const latex = await page
    .locator('#mf-1')
    .evaluate((mfe: MathfieldElement) => {
      return mfe.value;
    });

  // The decimal after the exponent should be separate
  expect(latex).toBe('5e-2.5');
});
