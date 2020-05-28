// Setup Enzyme 3 (one-time only task)
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

// Setup environment variable
import DotEnv from 'dotenv';
DotEnv.config({ path: '.env.test' });