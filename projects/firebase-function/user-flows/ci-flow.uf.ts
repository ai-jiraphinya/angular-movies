import {UserFlowContext, UserFlowInteractionsFn, UserFlowOptions, UserFlowProvider,} from '@push-based/user-flow';
import {MovieListPageUFO} from '../../movies-user-flows/src';

const flowOptions: UserFlowOptions = {
  name: 'Firebase Function Emulation',
};

const interactions: UserFlowInteractionsFn = async (
  context: UserFlowContext
): Promise<any> => {
  const {flow, collectOptions} = context;
  const url = `${collectOptions.url}/list/category/popular`;
  const movieListPage = new MovieListPageUFO(context);

  await flow.navigate(url, {
    stepName: '🧭 Initial navigation',
  });
  await movieListPage.awaitHeadingContent();
  return;
};

export const userFlowProvider: UserFlowProvider = {
  flowOptions,
  interactions,
};

export default userFlowProvider;
