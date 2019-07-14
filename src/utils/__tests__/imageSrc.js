import { createCoverImg } from 'utils/imageSrc';

it('creates placeholder image link when no path is provided', () => {
  expect(createCoverImg()).toMatch(/via.placeholder.com/);
});

it('creates image link with w500 size when no size provided', () => {
  const path = '/some-path';
  expect(createCoverImg(path)).toMatch(new RegExp(path));
  expect(createCoverImg(path)).toMatch(/w500/);
});

it('creates image link with given size', () => {
  const path = '/some-path';
  const size = 'original';
  const url = createCoverImg(path, size);
  expect(url).toMatch(new RegExp(path));
  expect(url).toMatch(new RegExp(size));
});
