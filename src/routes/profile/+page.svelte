<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
  
    import { createClient } from '@supabase/supabase-js';
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  
    let { profile, courses, userId } = data;
  
    let username = profile?.username ?? '';
    let handicap = profile?.handicap?.toString() ?? '';
    let home_course_id = profile?.home_course_id?.toString() ?? '';
    let profilePicFile: File | null = null;
    const placeholderProfilePic = '/img/placeholder-profile.png';
    let currentProfilePic = profile?.profile_pic_url ?? placeholderProfilePic;
  
    function validateForm() {
      if (username.length < 6 || username.length > 20) {
        alert("Username must be between 6 and 20 characters.");
        return false;
      }
      if (handicap && isNaN(Number(handicap))) {
        alert("Handicap must be a decimal number.");
        return false;
      }
  
      if (profilePicFile) {
        if (profilePicFile.size > 2 * 1024 * 1024) {
          alert("Profile picture must be smaller than 2MB.");
          return false;
        }
        if (!profilePicFile.type.startsWith('image/')) {
          alert("Profile picture must be an image.");
          return false;
        }
      }
  
      return true;
    }
  
    async function saveProfile() {
      if (!validateForm()) return;
  
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        alert("You must be logged in to save your profile.");
        return;
      }
  
      const uid = sessionData.session.user.id;
      let profilePicUrl = profile?.profile_pic_url ?? null;
  
      if (profilePicFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-pics')
          .upload(`public/${uid}.png`, profilePicFile, { upsert: true });
  
        if (uploadError) {
          console.error(uploadError);
          alert("Error uploading profile picture");
          return;
        }
  
        const { data: publicUrl } = supabase.storage
          .from('profile-pics')
          .getPublicUrl(`public/${uid}.png`);
        
        profilePicUrl = publicUrl.publicUrl;
        currentProfilePic = profilePicUrl;
      }
  
      const { error } = await supabase.from('profiles').upsert({
        id: uid,
        username,
        handicap: handicap !== '' ? Number(handicap) : null,
        home_course_id: home_course_id !== '' ? Number(home_course_id) : null,
        created_at: profile?.created_at ?? new Date().toISOString(),
        profile_pic_url: profilePicUrl
      });
  
      if (error) {
        console.error(error);
        alert("Error saving profile");
      } else {
        alert("Profile saved!");
      }
    }
  </script>
  
  <div class="max-w-4xl mx-auto p-4 flex space-x-8">
    <div class="w-1/3 flex flex-col items-center space-y-4">
      <img 
        src={currentProfilePic} 
        alt="Profile" 
        class="w-48 h-48 object-cover rounded-full border border-gray-300"
      />
      <div>
        <label for="profile_pic" class="block font-medium mb-1">Profile Picture</label>
        <input 
          id="profile_pic"
          class="w-full border p-2"
          type="file"
          accept="image/*"
          on:change={(e: Event) => {
            const target = e.currentTarget as HTMLInputElement;
            profilePicFile = target.files?.[0] ?? null;
          }}
        />
        <p class="text-sm text-gray-500 mt-1">Max size: 2MB, JPG/PNG</p>
      </div>
    </div>
  
    <div class="w-2/3">
      <h1 class="text-2xl font-bold mb-4">Your Profile</h1>
      <form on:submit|preventDefault={saveProfile} class="space-y-4">
        <div>
          <label for="username" class="block font-medium mb-1">Username</label>
          <input 
            id="username" 
            class="w-full border p-2" 
            type="text" 
            bind:value={username} 
            required 
            minlength="6" 
            maxlength="20" 
            pattern={"^.{6,20}$"}
            title="Username must be between 6 and 20 characters."
          />
        </div>
  
        <div>
          <label for="handicap" class="block font-medium mb-1">Handicap</label>
          <input 
            id="handicap"
            class="w-full border p-2"
            type="number"
            step="0.1"
            bind:value={handicap}
            placeholder="e.g. 12.5"
          />
        </div>
  
        <div>
          <label for="home_course_id" class="block font-medium mb-1">Home Course</label>
          <select
            id="home_course_id"
            class="w-full border p-2"
            bind:value={home_course_id}
          >
            <option value="">None</option>
            {#each courses as course}
              <option value={course.id}>{course.name}</option>
            {/each}
          </select>
        </div>
  
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  </div>