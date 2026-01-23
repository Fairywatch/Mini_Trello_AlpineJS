window.formHandler = function() {
    return {
        show: false,
        modifId: null,
        formData: { 
            title: '', 
            desc: '', 
            statut: 'a faire'
        },

        modification(tache) {
            this.modifId = tache.id;
            this.formData.title = tache.title;
            this.formData.desc = tache.desc;
            this.formData.statut = tache.statut;
            this.show = true;
        },

        submitForm() {
            if (!this.formData.title.trim() || !this.formData.desc.trim()) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            if (this.modifId) {
                this.$dispatch('tache-modifiee', {
                    id: this.modifId,
                    details: {
                        title: this.formData.title,
                        desc: this.formData.desc,
                        statut: this.formData.statut
                    }
                });
            } else {
                this.$dispatch('tache-ajoutee', {
                    titre: this.formData.title,
                    description: this.formData.desc
                });
            }
            
            this.reset();
        },

        reset() {
            this.show = false;
            this.modifId = null;
            this.formData = { title: '', desc: '', statut: 'a faire' };
        }
    }
}
