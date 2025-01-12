'use server';

import { supabase } from '@/services/supabase';
import { auth, signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = String(formData.get('nationality')).split(
    '%',
  );

  if (!/^[a-zA-Z0-9]{6,12}$/.test(String(nationalID))) {
    throw new Error('Please provide a valid national ID');
  }

  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user?.id);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
