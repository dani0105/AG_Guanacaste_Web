import { ImageFile } from './image-file';

describe('ImageFile', () => {
  it('should create an instance', () => {
    expect(new ImageFile(new File([], ''), false, false)).toBeTruthy();
  });
});
