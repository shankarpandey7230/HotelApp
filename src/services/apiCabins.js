import supabase from './supabase';

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return cabins;
};
