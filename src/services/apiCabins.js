import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
};

// export const createCabin = async (newCabin) => {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     '/',
//     ''
//   );
//   // console.log(imageName);
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
//   // https://gqksqpvrleidggknqarm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
//   // https://gqksqpvrleidggknqarm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
//   // 1. Cabin creation
//   // console.log(imagePath);
//   const { data, error } = await supabase
//     .from('cabins')
//     .insert([{ ...newCabin, image: imagePath }]);

//   // console.log({ data, error });
//   if (error) {
//     console.error(error);
//     throw new Error('Cabins could not be created');
//   }
//   // if Successful image uploaded
//   const { error: storageError } = await supabase.storage
//     .from('cabins-images ')
//     .upload(imageName, newCabin.image);
//   // Delete the cabin if there was an error uploading the corresponding error

//   if (storageError) {
//     await supabase.from('cabins').delete().eq('id', data.id);
//     console.error(error);
//     throw new Error(
//       'Cabin image could not be uploaded and cabin was not created'
//     );
//   }
//   return data;
// };

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  // 2. Upload Image

  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the Cabin IF there was an error uploading image

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}
