const urls = [
  '/src/assets/data/man1.jpg',
  '/src/assets/data/woman.jpg',
  '/src/assets/data/businessman.jpg',
  '/src/assets/data/programmer.jpg',
  '/src/assets/data/developer.jpg'
];

const nicknames = ['John', 'Emily', 'Alex', 'Sophia', 'Ethan'];

const descriptions = [
  'Experienced programmer looking for exciting startup opportunities.',
  'Creative designer seeking innovative projects to collaborate on.',
  'Skilled developer with a passion for building scalable software solutions.',
  'Visionary project leader with a track record of successful startup ventures.',
  'Talented programmer specializing in backend development for ambitious projects.'
];

let testUser: any = {
  login: "your email",
  name: "your name",
  avatarUrl: "/src/assets/data/man1.jpg"
}

let choiceHistory: any[] = [];

interface TestDataIntf {
  urls: any,
  nicknames: any,
  descriptions: any,

  choiceHistory: any,

  testUser: any,
}

export const TestData: TestDataIntf = {
  urls,
  nicknames,
  descriptions,

  choiceHistory,

  testUser,
};
