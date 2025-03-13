import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('Board should be empty and X should start', async ({ page }) => {
    await expect(page.getByTestId('status')).toHaveText('Next player: X');
    const squares = await page.locator('.square');
    await expect(squares).toHaveCount(9);
    for (let i = 0; i < 9; i++) {
      await expect(squares.nth(i)).toBeEmpty();
    }
  });

  test('Players order should alternate', async ({ page }) => {
    await page.getByTestId('square-0').click();
    await expect(page.getByTestId('square-0')).toHaveText('X');
    await expect(page.getByTestId('status')).toHaveText('Next player: O');

    await page.getByTestId('square-7').click();
    await expect(page.getByTestId('square-7')).toHaveText('O');
    await expect(page.getByTestId('status')).toHaveText('Next player: X');
  });

  test('Win condition check', async ({ page }) => {
    await page.getByTestId('square-0').click(); // X
    await page.getByTestId('square-1').click();
    await page.getByTestId('square-3').click(); // X
    await page.getByTestId('square-4').click();
    await page.getByTestId('square-6').click(); // X

    await expect(page.getByTestId('status')).toContainText('Winner: X');
  });

  test('Reset button', async ({ page }) => {
    await page.getByTestId('square-0').click(); // X

    await page.getByTestId('reset-button').click();

    await expect(page.getByTestId('status')).toHaveText('Next player: X');
    const squares = await page.locator('.square');
    await expect(squares).toHaveCount(9);
    for (let i = 0; i < 9; i++) {
      await expect(squares.nth(i)).toBeEmpty();
    }
  });
});