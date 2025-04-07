import slugify from 'slugify';

export const replaceName = (string) => {
    if (!string) return '';
    string = slugify(string, { lower: true, locale: 'vi' });
    return string;
};
