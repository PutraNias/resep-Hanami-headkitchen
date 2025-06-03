import { db, storage } from "./firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// DOM Elements
const resepForm = document.getElementById('resepForm');
const resepList = document.getElementById('resepList');
const uploadInput = document.getElementById('uploadGambar');
const previewDiv = document.getElementById('previewGambar');

// Load recipes on page load
document.addEventListener('DOMContentLoaded', async () => {
  await renderResep();
});

// Upload image to Firebase Storage
async function uploadImage(file) {
  const storageRef = ref(storage, `resep-images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Render recipes from Firestore
async function renderResep() {
  const querySnapshot = await getDocs(collection(db, "resep"));
  resepList.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const resep = doc.data();
    const card = document.createElement('div');
    card.className = 'resep-card';
    card.innerHTML = `
      <img src="${resep.gambar}" alt="${resep.nama}">
      <div class="resep-info">
        <h3>${resep.nama}</h3>
        <p>${resep.deskripsi}</p>
        <small>⏱ ${resep.waktu}</small>
        <button onclick="editResep('${doc.id}')">Edit</button>
        <button onclick="hapusResep('${doc.id}')">Hapus</button>
      </div>
    `;
    resepList.appendChild(card);
  });
}

// Submit form
resepForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nama = document.getElementById('namaResep').value;
  const deskripsi = document.getElementById('deskripsiResep').value;
  const caraMemasak = document.getElementById('caraMemasak').value.split('\n');
  const waktu = document.getElementById('waktuResep').value;
  const fileGambar = uploadInput.files[0];

  let gambarUrl = '';
  if (fileGambar) {
    gambarUrl = await uploadImage(fileGambar);
  }

  await addDoc(collection(db, "resep"), {
    nama,
    deskripsi,
    caraMemasak,
    waktu,
    gambar: gambarUrl || 'https://via.placeholder.com/300x200?text=No+Image'
  });

  resepForm.reset();
  await renderResep();
});

// Preview image before upload
uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewDiv.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

// Delete recipe
window.hapusResep = async (id) => {
  if (confirm('Hapus resep ini?')) {
    await deleteDoc(doc(db, "resep", id));
    await renderResep();
  }
};

// Edit recipe
window.editResep = async (id) => {
  // Implement edit logic here
  console.log('Edit resep:', id);
};