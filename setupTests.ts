import "@testing-library/jest-dom";
import { bucharestData } from "./src/utils/tests/dummyData2";
import { vi, type Mock } from "vitest";

global.fetch = vi.fn(
  () => new Promise((resolve) => resolve(bucharestData))
) as Mock;
