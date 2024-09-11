
    $(document).ready(function () {
        // form contacto
        const modalHTML = `

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Contacto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="formulariolindo">
                        <div class="row mb-3">
                            <div class="col">
                              <input type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" required>
                            </div>
                            <div class="col">
                              <input type="text" class="form-control" placeholder="Apellidos" aria-label="Apellidos" required>
                            </div>
                          </div>
                        <div class="mb-3">
                            <input type="email" class="form-control" placeholder="Correo electrónico" aria-describedby="emailHelp" required>
                            <div id="emailHelp" class="form-text">El correo es para contactarnos con usted.</div>
                        </div>
                        <div class="input-group mb-1">
                            <span class="input-group-text">+56</span>
                            <input type="tel" class="form-control input-group" placeholder="Número de telefono" pattern="[9] [0-9]{4} [0-9]{4}" aria-label="numeroDeTelefono" required>
                        </div>
                        <p class="form-text">Formato esperado: 9 1111 1111</p>
                        <div class="mb-3">
                            <textarea class="col-12" name="mensajito" id="comentario" placeholder="Mensaje o Comentario" aria-label="mensajeOComentario"></textarea>
                        </div>
    
    
                        <button type="submit" id ="btnEnviar" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>`;

        $('#formularioConModal').html(modalHTML);

        $('#contacto').click(function () {
            $('#exampleModal').modal('show');

        });
        const formularioLindo = $('#formulariolindo');
        const botonEnviarFormulario = $('#btnEnviar');
        const datosRequeridosForm = formularioLindo.find('input[required], textarea[required]');

        function validarFormulario() {
            let todosLosDatosCorrectos = true;

            datosRequeridosForm.each(function () {
                if (!$.trim($(this).val())) {
                    todosLosDatosCorrectos = false;
                }
            });

            botonEnviarFormulario.prop('disabled', !todosLosDatosCorrectos);
        }

        datosRequeridosForm.on('input', validarFormulario);

        validarFormulario();

        formularioLindo.on('submit', function (event) {
            if (botonEnviarFormulario.prop('disabled')) {

                event.preventDefault();
                alert('Por favor, completa todos los campos requeridos antes de enviar.');
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Formulario Enviado",
                    showConfirmButton: false,
                    timer: 2500
                });
                $('#exampleModal').modal('hide')
                formularioLindo[0].reset()

            };

        });
    })
